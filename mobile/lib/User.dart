class User{
String _name;
String _email;
String _password;
String _type;

User(this._name,this._email,this._password,this._type);

String get name => _name;
String get email => _email;
String get password => _password;
String get type => _type;

set name(String value){
_name=value;
}

set email(String value){
_email=value;
}

set password(String value){
_password=value;
}
set type(String value){
_type=value;
}

}