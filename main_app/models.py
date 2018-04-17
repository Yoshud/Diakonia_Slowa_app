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
    class Meta:
        verbose_name = 'tag produktu'
        verbose_name_plural = 'Tagi produktów'


class Tech_tag_base(Tag):
    class Meta:
        verbose_name = 'tag techniczny produktu'
        verbose_name_plural = 'Tagi techniczne produktów'


class Realisation_tag_base(Tag):
    class Meta:
        verbose_name = 'status realizacji'
        verbose_name_plural = 'Tagi statusów realiacji'


class On_Shelf_Position_base(Tag):
    class Meta:
        verbose_name = 'pozycja na półce'
        verbose_name_plural = 'Dostępne pozycje produktów na półce'


class Product_base(models.Model):
    product_name = models.CharField("nazwa", max_length=200, default="no_name")
    price = models.DecimalField("cena", max_digits=5, decimal_places=2, default=0.00)
    quantity = models.IntegerField("Ilość", default=0)
    tag = models.ManyToManyField(Tag_base, related_name="product", blank=True)
    position = models.ForeignKey(On_Shelf_Position_base, related_name='product', blank=True, null=True, on_delete=models.CASCADE)
    tech_tag = models.ManyToManyField(Tech_tag_base, related_name="product", blank=True)

    class Meta:
        verbose_name = 'produkt'
        verbose_name_plural = 'Produkty'

    def __str__(self):
        return self.product_name + ' ilosc: ' + str(self.quantity) + " cena: " + str(
            self.price) + "zł/szt"

    def is_in_stock(self):
        return (self.quantity > 0)

    def sorted_by_date_order_set(self):
        return self.product_order_base_set.order_by("order__date")

class Order_base(models.Model):
    date = models.DateTimeField("data sprzedaży", default=timezone.now)

    def __str__(self):
        return str(self.date.date()) + " godz." + str(self.date.time())[0:5]

    class Meta:
        verbose_name = 'zamówienie'
        verbose_name_plural = 'Zamówienia'


class Product_order_base(models.Model):
    product = models.ForeignKey(Product_base, on_delete=models.CASCADE)
    order = models.ForeignKey(Order_base, on_delete=models.CASCADE)
    price_in_moment = models.DecimalField("cena w momencie sprzedaży", max_digits=5, decimal_places=2, default=0.00)

    quantity = models.IntegerField("Ilość sprzedanych", default=1)

    def __str__(self):
        return " " + self.product.product_name + " " + str(self.quantity) + "sztuk  " + str(
            self.price_in_moment * self.quantity) + "zł"

    class Meta:
        verbose_name = 'zamówienie produktu'
        verbose_name_plural = 'Zamówienie produktów'


class Client_base(models.Model):
    firstname = models.CharField("Imię", max_length=200, default="no_name")
    surname = models.CharField("Nazwisko", max_length=200, default="no_name")
    email = models.EmailField("e-mail", max_length=200, default="")

    def __str__(self):
        return self.firstname + " " + self.surname

    class Meta:
        verbose_name = 'klient'
        verbose_name_plural = 'Klienci'

class Debtor_base(models.Model):
    if_settle = models.BooleanField("Czy uregulowane", default=False)
    order = models.OneToOneField(Order_base, on_delete=models.CASCADE, related_name="debtor")
    client = models.ForeignKey(Client_base, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.client) + " " + str(self.order) + " " + str(self.if_settle)

    class Meta:
        verbose_name = 'dłużnik'
        verbose_name_plural = 'Dłużnicy'


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
    form_of_payment = models.CharField("forma płatności", max_length=1, choices=FORMS_OF_PAYMENT, default=GOTOWKA)

    def __str__(self):
        return str(self.client) + " metoda płatności: " + self.form_of_payment

    class Meta:
        verbose_name = 'zamówienie zewnętrzne'
        verbose_name_plural = 'Zamówienia zewnętrzne'


class Order_extern_realisation_base(models.Model):
    order = models.ForeignKey(Order_extern_base, related_name="realisations", on_delete=models.CASCADE)
    realisation_tag = models.ForeignKey(Realisation_tag_base, related_name="order_realisation",
                                        on_delete=models.CASCADE)
    date = models.DateTimeField("data", default=timezone.now)

    def __str__(self):
        return str(self.date.date()) + " " + str(self.realisation_tag) + " " + str(self.order)

    class Meta:
        verbose_name = 'zamówienie zewnętrzne - realizacja'
        verbose_name_plural = 'Zamówienia zewnętrzne - realizacja'


class Product_order_extern_realisation_base(models.Model):
    product = models.ForeignKey(Product_base, on_delete=models.CASCADE)
    order = models.ForeignKey(Order_extern_realisation_base, on_delete=models.CASCADE)
    price_in_moment = models.DecimalField("cena w momencie sprzedaży", max_digits=5, decimal_places=2, default=0.00)
    quantity = models.IntegerField("ilość zamówionych", default=1)

    def __str__(self):
        return " " + self.product.product_name + " " + str(self.quantity) + "sztuk  " + str(
            self.price_in_moment * self.quantity) + "zł"

    class Meta:
        verbose_name = 'zamówienie produktu zewnętrzne - realizacja'
        verbose_name_plural = 'Zamówienia produktów zewnętrzne - realiacja'
