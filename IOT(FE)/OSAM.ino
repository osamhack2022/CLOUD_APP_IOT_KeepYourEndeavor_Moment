#include <Wire.h>                     // i2C 통신을 위한 라이브러리
#include <LiquidCrystal_I2C.h>        // LCD 2004 I2C용 라이브러리
LiquidCrystal_I2C lcd(0x27,16,2);     //  0x3F or 0x27를 선택하여 주세요. 작동이 되지 않는 경우 0x27로 바꾸어주세요. 확인결과 0x3f가 작동하지 않을 수 있습니다.
//고유주소가 LCD마다 다르기 때문입니다.

#include <SoftwareSerial.h>


#define trigPin1 8  // 초음파 발신핀 define은 쉽게말하면, 숫자의 이름을 정의해주는것. 
#define echoPin1 9  // 초음파 수신핀
#define BT_RXD 7 
#define BT_TXD 6
#define LED_PIN 4
#define sw 2
#define sw1 3
SoftwareSerial BTSerial(BT_RXD, BT_TXD);

//변수를 설정합니다. 
long duration1, distance;
int count = 0;
bool down_flag = false;
bool up_flag = false;

extern volatile unsigned long timer0_millis; //타이머변수
unsigned long timeVal = 0; //이전시간
unsigned long millisTime = 0; //현재시간
int time = 120;
bool state = false;
bool test = false;
int sendCnt = 1;
void setup() 
{
  pinMode(trigPin1,OUTPUT);   // trig를 출력 모드로 설정
  pinMode(echoPin1,INPUT);    // echo를 입력모드로 설정
  pinMode(sw, INPUT_PULLUP);
  pinMode(sw1, INPUT_PULLUP);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);        //시리얼 프린트 시작
  
  BTSerial.begin(9600);      // bluetooth 시작
  lcd.init();                // LCD 초기화
  lcd.backlight();           // 백라이트 켜기
  
}

void loop() 
{
  //초음파 센서를 한번 초기화 하는 과정입니다. 마치 껏다 켯다를 하면서 거리를 초기화합니다.
  digitalWrite(trigPin1, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(2);
  digitalWrite(trigPin1, LOW);
  duration1 = pulseIn(echoPin1, HIGH);
  distance= duration1*0.034/2;
  
  if(state==true){ //카운트 시작
    if(millis()-timeVal>=1000){ //1초단위로 시작
      timeVal=millis();
      time -= 1;
    }
  } 
  if (time == 0) {
    test = false;
    state = false;
    if (sendCnt == 1) {
      char st[20]; 
      itoa(count, st, 10);
      BTSerial.write(st);
      lcd.clear();
      lcd.setCursor(1,0);
      lcd.print("TIMEOUT!!!");
      --sendCnt;
    } else {
      lcd.clear();
      lcd.setCursor(1,0);
      lcd.print("TIMEOUT!!!");
    }
  } else if (test) {
    if((0<distance) && (distance<10) ){
      down_flag=true;
      up_flag=false;                        
    } else if( (20<distance) && (distance<100) ){
      up_flag=true;
    } else {      
    }     

    if( (down_flag==true) && (up_flag==true) ){
      //푸쉬업 카운트,kcal를 증가,
      count++;
      digitalWrite(LED_PIN, HIGH);  
      //다시 down_flag와 up_flag를 false로 설정해준다.
      down_flag=false;
      up_flag=false;        
      // LCD를 초기화 합니다.
      lcd.clear();
      digitalWrite(LED_PIN, LOW);
    }
    lcd.clear();
    lcd.setCursor(1,0);
    lcd.print("REMAIN:");
    lcd.print(time);
    lcd.setCursor(4,1);
    lcd.print("Count: "); lcd.print(count); 
    delay(100);
  } else if (!test) {
    lcd.clear();
    lcd.setCursor(1,0);
    lcd.print("PUSH START BTN!");
  }
  

  if (BTSerial.available()) {
    Serial.write(BTSerial.read());
    

  }
  if (Serial.available()) {
    BTSerial.write(Serial.read());
  }

  if(digitalRead(sw)) {
    digitalWrite(LED_PIN, HIGH);  
    delay(1000);
    count = 0;   
    time = 120;
    test = false;
    state = false;
    sendCnt = 1;
    digitalWrite(LED_PIN, LOW);
  }
  
  if(!digitalRead(sw1)) {
    digitalWrite(LED_PIN, HIGH);  
    delay(2000);
    test = true;
    state = true;
    digitalWrite(LED_PIN, LOW);
  }
  
   
  
  }

