int photoPort = 0;
int tempPort = 1;
int humPort = 2;
int levelPort = 3;
int humRead = 0;
int tempRead = 0;
int photoRead = 0;
int levelRead = 0;
String incomingByte;

void setup(){
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop(){
  //humRead = analogRead(humPort);
  humRead = 35;
  //tempRead = analogRead(tempPort)
  tempRead = 24;
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
      digitalWrite(13, LOW);
    }
    else {
      digitalWrite(13, HIGH);
    }
  }
}
