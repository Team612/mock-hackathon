import os
import face_recognition
import pickle

KNOWN_FACES_DIR = "known_faces"

def load_known_faces():

	print("Loading training faces...")

	known_embeddings = []
	known_names = []

	for subdir, dirs, files in os.walk(KNOWN_FACES_DIR):

		label = os.path.basename(subdir)  # Get name of folder

		for file in files:  # Loop through each file in the folder
			
			image_dir = os.path.join(subdir, file)  # Create full path for each file

			# Load and create encoding for each image
			image = face_recognition.load_image_file(image_dir)
			encoding = face_recognition.face_encodings(image)[0]
			
			# Create reference dictionary for known faces
			known_embeddings.append(encoding)
			known_names.append(label)
			
			with open("pickles/embeddings.pickle", "wb") as f:
				pickle.dump(known_embeddings, f)

			with open("pickles/names.pickle", "wb") as f:
				pickle.dump(known_names, f)

	print("Done! Saved in /pickles/ folder!")

if (__name__ == "__main__"):
	load_known_faces()