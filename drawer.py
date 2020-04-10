import cv2
import face_recognition
import os
import pickle

face_cascade = cv2.CascadeClassifier('haarcascades/haarcascade_frontalface_default.xml')

known_faces = pickle.loads(open("pickles/embeddings.pickle", "rb").read())
known_names = pickle.loads(open("pickles/names.pickle", "rb").read())

TOLERANCE = 0.6  # Tolerance for face detection

def indentify_face(image):
	print("Scanning face...")
	global known_faces, known_names
	
	locations = face_recognition.face_locations(image, model="cnn")
	encodings = face_recognition.face_encodings(image, locations)
	face_img = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

	for face_encoding, face_location in zip(encodings, locations):
		results = face_recognition.compare_faces(known_faces, face_encoding, TOLERANCE)
		Match = None
		if True in results:
			match = known_names[results.index(True)]
			print("Match founds: {}".format(match))


cam = cv2.VideoCapture(0)  # Video capture instance

while True:
	
	_, frame = cam.read()
	display = frame.copy()  # Display frame with drawing

	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

	faces = face_cascade.detectMultiScale(gray, 1.3, 5)

	for face_id, (x, y, w, h) in enumerate(faces):
		cv2.rectangle(display, (x,y), (x+w, y+h), (255, 0, 0), 2)
		
		image = frame.copy()[y:y+h, x:x+w]	
				
	cv2.imshow('webcam', display)
	
	key = cv2.waitKey(1)
	if  key == ord("q"): 
		break  # esc to quit
	elif key == ord("c"):
		indentify_face(image)

cv2.destroyAllWindows()