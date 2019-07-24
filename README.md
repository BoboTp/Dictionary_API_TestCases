The test plan is to run the basic test cases to 
•	Create a Dictionary
•	Delete a Dictionary
•	Create or modify a Key Value pair
 
There is multiple usage of the same code, every instance after performing a manipulation might over write the existing value so I did not what to complicate it in the short span of time and I repeated the same task.(like creation of dictionary)

How to run:
1.	Extract the Zip file
2.	Npm install in the same directory where the file is extracted
3.	Sudo npm install -g jest
4.	Precondition : Unless the Auth variable set as environment the code won’t run.
This was done as requested not to enter the Authorization header anywhere in the public or git.
This way of setting the API key Is one of the secure ways to implement it

5.	In the same directory create a file “setup.sh” and add the following three lines in it.

echo "Setting up Environment Variables"
export AUTH='SOME AUTH KEY'
jest
