int photoPort = 2;
int tempPort = 1;
int humPort = 0;
int levelPort = 3;
int soilPower = 7;
int humRead = 0;
int tempRead = 0;
int photoRead = 0;
int levelRead = 0;
String incomingByte;

void setup(){
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  pinMode(soilPower, OUTPUT);
  digitalWrite(soilPower, LOW);
  pinMode(4, OUTPUT);
  digitalWrite(4, HIGH);
  delay(200);
  digitalWrite(4, LOW);
}

void loop(){
  humRead = readhum();
  tempRead = analogRead(tempPort);
  float voltage = tempRead * 5.0;
  voltage /= 1024.0;
  tempRead = (voltage - 0.5) * 100;

  photoRead = analogRead(photoPort);
  //levelRead = analogRead(levelPort);
  levelRead = 10;

  Serial.print(humRead);
  Serial.print(",");
  Serial.print(tempRead);
  Serial.print(",");
  Serial.print(photoRead);
  Serial.print(",");
  Serial.println(levelRead);
  incomingByte = Serial.readString();
  if (incomingByte != ""){
    if (incomingByte == "L0"){
      digitalWrite(4, LOW);
    }
    else {
      digitalWrite(4, HIGH);
    }
  }
}

int readhum()
{
  digitalWrite(soilPower, HIGH);//turn D7 "On"
  delay(10);//wait 10 milliseconds
  int val = analogRead(humPort);//Read the SIG value form sensor
  digitalWrite(soilPower, LOW);//turn D7 "Off"
  val = map(val,450,650,10,80);
  return val;//send current moisture value
}
