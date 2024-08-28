from django.db import models


class Client(models.Model):
    """
    Pour le modele Client(nom, prenom, contact)
    """
    first_name = models.CharField("prénoms", max_length=30)
    last_name = models.CharField("nom", max_length=30)
    contact = models.CharField("contact", max_length=15)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
    