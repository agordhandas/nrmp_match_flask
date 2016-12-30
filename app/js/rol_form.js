
const schema = {
  "type": "object",
  "properties": {
    "listOfStrings": {
      "type": "array",
      "title": "A list of strings",
      "items": {
        "type": "string",
        "enum": [
          "MGH",
          "BIH",
          "UCSD"
        ]
      }
    }
  }
};
module.exports=schema;