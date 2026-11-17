from django.db import models

# Create your models here.

class Products(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    image = models.ImageField(upload_to='mahsulotlar', blank=True)

    def __str__(self):
        return self.name

class SiteInfo(models.Model):
    brandname = models.CharField(max_length=80)
    reklama = models.CharField(max_length=200)
    shior = models.CharField(max_length=150)
    c = models.CharField(max_length=100)

    def __str__(self):
        return self.brandname

