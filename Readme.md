Go to https://stackapps.com/apps/oauth/register and register your application with the following credentials 
```
OAuth Domain = localhost

Application Website = localhost 
```
Copy the newly generated API key from
## Run Locally

- with Docker (you must have docker and docker-compose installed on your system)

Clone the project

```bash
git clone https://github.com/Neeraj319/TeamWaveAssignment
```
Make .env file and add configuration according to `.env.example`
#### With Docker

Go to the project directory

```bash
cd TeamWaveAssignment
```

```
sudo docker-compose up --build
```

#### NOTE:
Sometimes throttling may not work cause browsers cache the same response again and again 
- To enable pagination go to settings.py and change
``` 
CREATE_PAGINATION = False
```
to 
```
CREATE_PAGINATION = True
```
However doing this will decreases the api's response time and will make it `extremely slow `