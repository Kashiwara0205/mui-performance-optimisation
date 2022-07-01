reboot:
	sudo docker-compose down;
	sudo docker-compose up;
down:
	sudo docker-compose down;
in:
	sudo docker exec -ti autocomplete-performance_app_1 /bin/bash