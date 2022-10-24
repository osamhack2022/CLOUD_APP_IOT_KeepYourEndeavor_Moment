#include <Wire.h>                     // i2C 통신을 위한 라이브러리
#include <LiquidCrystal_I2C.h>        // LCD 2004 I2C용 라이브러리
LiquidCrystal_I2C lcd(0x27,16,2);     //  0x3F or 0x27를 선택하여 주세요. 작동이 되지 않는 경우 0x27로 바꾸어주세요. 확인결과 0x3f가 작동하지 않을 수 있습니다.
//고유주소가 LCD마다 다르기 때문입니다.
#include <SoftwareSerial.h>


#define trigPin1 8  // 초음파 발신핀 define은 쉽게말하면, 숫자의 이름을 정의해주는것. 
#define echoPin1 9  // 초음파 수신핀
#define BT_RXD 6
#define BT_TXD 7
SoftwareSerial bluetooth(BT_RXD, BT_TXD);

//변수를 설정합니다. 
long duration1, distance;
int count = 0;
bool down_flag = false;
bool up_flag = false;
int sw  = 2;
void setup() 
{
  pinMode(trigPin1,OUTPUT);   // trig를 출력 모드로 설정
  pinMode(echoPin1,INPUT);    // echo를 입력모드로 설정
  pinMode(sw, INPUT_PULLUP);
  Serial.begin(9600);        //시리얼 프린트 시작
  bluetooth.begin(9600);      // bluetooth 시작
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
  
 

  lcd.clear();
  lcd.setCursor(1,0);
  lcd.print("Distance Check");
  lcd.setCursor(4,1);
  lcd.print("Count: "); lcd.print(count); 
  delay(100);

  if (bluetooth.available()) {
    Serial.write(bluetooth.read());
  }
  if (Serial.available()) {
    bluetooth.write(Serial.read());
  }

  if(digitalRead(sw)) {
    count = 0;
  } else {
    
  }
  

  if((0<distance) && (distance<10) ){
    down_flag=true;
    up_flag=false;                        
  } else if( (20<distance) && (distance<100) ){
    up_flag=true;
  } else{      
  }      
  if( (down_flag==true) && (up_flag==true) ){
    //푸쉬업 카운트,kcal를 증가,
    count++;  
    //다시 down_flag와 up_flag를 false로 설정해준다.
    down_flag=false;
    up_flag=false;        
    // LCD를 초기화 합니다.
    lcd.clear();
    }
  }

