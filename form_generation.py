import pickle

def generate_rol_form ():
	place_holder_schema = {
	"type": "object",
	"properties": {
    "listOfStrings": {
      "type": "array",
      "title": "",
      "items": {
        "type": "string",
        "enum": []
      }
    }
  }
}
	program_list = pickle.load (open ('match_data/programs.p', 'rb'))
	program_list.sort()
	place_holder_schema['properties']['listOfStrings']['items']['enum'] = program_list
	schema = place_holder_schema
	return schema


def generate_program_form(programs):
	place_holder_schema = {
  "type": "object",
  "title": "",
  "properties": {

  }
}
	properties_dict = {key: {'title':key, 'type':'integer'} for key in programs}
	place_holder_schema['properties'] = properties_dict
	return place_holder_schema

