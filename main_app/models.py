# Create your models here.

from django.db import models
from django.utils import timezone
from datetime import time

class Tag(models.Model):
    tag = models.CharField("tag", max_length=50, default="")
    def __str__(self):
        return self.tag
    class Meta:
        abstract = True

class Tag_base(Tag):
    pass
class Tech_tag_base(Tag):
    pass
class Realisation_tag_base(Tag):
   pass


class Product_base(models.Model):
    product_name = models.CharField("nazwa", max_length=200, default="no_name")
    price = models.DecimalField("cena", max_digits=5, decimal_places=2, default=0.00)
    quantity = models.IntegerField("Ilość", default=0)
    tag = models.ManyToManyField(Tag_base, related_name="product", blank=True)
    tech_tag = models.ManyToManyField(Tech_tag_base, related_name="product_tech", blank=True)

    def __str__(self):
        return self.product_name + ' ilosc: ' + str(self.quantity) + " cena: " + str(
            self.price) + "zł/szt"

    def is_in_stock(self):
        return (self.quantity > 0)

class Order_base(models.Model):
    date = models.DateTimeField("data sprzedaży", default=timezone.now)

    def __str__(self):
        return str(self.date.date()) + " godz." + str(self.date.time())[0:5]


class Product_order_base(models.Model):
    product = models.ForeignKey(Product_base, on_delete=models.CASCADE)
    order = models.ForeignKey(Order_base, on_delete=models.CASCADE)
    price_in_moment = models.DecimalField("cena w momencie sprzedaży", max_digits=5, decimal_places=2, default=0.00)

    quantity = models.IntegerField("Ilość sprzedanych", default=1)

    def __str__(self):
        return " " + self.product.product_name + " " + str(self.quantity) + "sztuk  " + str(
            self.price_in_moment * self.quantity) + "zł"


class Client_base(models.Model):
    firstname = models.CharField("Imię", max_length=200, default="no_name")
    surname = models.CharField("Nazwisko", max_length=200, default="no_name")
    email = models.EmailField("e-mail", max_length=200, default="")
    def __str__(self):
        return self.firstname + " " + self.surname

class Debtor_base(models.Model):
    if_settle = models.BooleanField("Czy uregulowane", default=False)
    order = models.OneToOneField(Order_base, on_delete=models.CASCADE, related_name="debtor")
    client = models.ForeignKey(Client_base, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.client) + " " + str(self.order) + " "+ str(self.if_settle)

class Order_extern_base(models.Model):
    GOTOWKA = 'G'
    PRZELEW = 'P'
    PRZELEW_REL = 'R'
    FORMS_OF_PAYMENT = (
        (GOTOWKA, 'gotówką'),
        (PRZELEW, 'przelew(niezrealizowany)'),
        (PRZELEW_REL, 'przelew(zrealizowany)'),
    )
    client = models.ForeignKey(Client_base, related_name="extern_order", on_delete=models.CASCADE)
    form_of_payment = models.CharField("forma płatności", max_length=1,choices=FORMS_OF_PAYMENT, default=GOTOWKA)
    def __str__(self):
        return str(self.client) + " metoda płatności: " + self.form_of_payment

class Order_extern_realisation_base(models.Model):
    order = models.ForeignKey(Order_extern_base, related_name="realisations", on_delete=models.CASCADE)
    realisation_tag = models.ForeignKey(Realisation_tag_base, related_name="order_realisation", on_delete=models.CASCADE)
    date = models.DateTimeField("data", default=timezone.now)
    def __str__(self):
        return str(self.date.date()) + " " + str(self.realisation_tag) + " " + str(self.order)

class Product_order_extern_realisation_base(models.Model):
    product = models.ForeignKey(Product_base, on_delete=models.CASCADE)
    order = models.ForeignKey(Order_extern_realisation_base, on_delete=models.CASCADE)
    price_in_moment = models.DecimalField("cena w momencie sprzedaży", max_digits=5, decimal_places=2, default=0.00)
    quantity = models.IntegerField("ilość zamówionych", default=1)

    def __str__(self):
        return " " + self.product.product_name + " " + str(self.quantity) + "sztuk  " + str(
            self.price_in_moment * self.quantity) + "zł"