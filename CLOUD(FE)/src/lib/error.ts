export interface SystemError {
    response: {
        status: number;
        data: {
            error: string;
            message: string;
        }
    }
  }
  