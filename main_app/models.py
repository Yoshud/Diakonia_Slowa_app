

# Create your models here.

from django.db import models
from django.utils import timezone
from datetime import time

class Product_base(models.Model):
    product_name = models.CharField("nazwa", max_length=200, default="no_name")
    price = models.DecimalField("cena", max_digits=5, decimal_places=2, default=0.00)
    quantity = models.IntegerField("Ilość",default = 0)
    def __str__(self):
        return str(self.pk) +" " + self.product_name + ' ilosc: ' + str(self.quantity) + " cena: " + str(self.price) + "zł/szt"

class Order_base(models.Model):
    date = models.DateTimeField("data sprzedaży", default=timezone.now)
    def __str__(self):
        return str(self.date.date()) + " godz." + str(self.date.time())[0:5]

class Sales_base(models.Model):
    product = models.ForeignKey(Product_base, on_delete=models.CASCADE)
    order = models.ForeignKey(Order_base, on_delete=models.CASCADE)
    price_in_moment = models.DecimalField("cena w momencie sprzedaży", max_digits=5, decimal_places=2, default=0.00)

    quantity = models.IntegerField("Ilość sprzedanych", default=1)
    def __str__(self):
        return " " + self.product.product_name + " " + str(self.quantity) + "sztuk  " + str(self.price_in_moment * self.quantity) + "zł"

class Debtor_base(models.Model):
    firstname = models.CharField("nazwa", max_length=200, default="no_name")
    surname = models.CharField("nazwa", max_length=200, default="no_name")
    if_settle = models.BooleanField("Czy uregulowane", default= False)
    order = models.OneToOneField(Order_base, on_delete=models.CASCADE, related_name="debtor")

