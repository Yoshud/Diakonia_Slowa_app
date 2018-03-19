from django.contrib import admin
from .models import Product_base, Sales_base, Order_base, Debtor_base
admin.site.register(Product_base)
admin.site.register(Sales_base)
admin.site.register(Order_base)
admin.site.register(Debtor_base)
# Register your models here.
