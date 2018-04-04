from django.contrib import admin
from .models import Product_base, Product_order_base, Order_base, Debtor_base, Client_base, Tag_base, \
    Realisation_tag_base, Order_extern_base, Order_extern_realisation_base, Product_order_extern_realisation_base

admin.site.register(Product_base)
admin.site.register(Product_order_base)
admin.site.register(Order_base)
admin.site.register(Debtor_base)
admin.site.register(Client_base)
admin.site.register(Tag_base)
admin.site.register(Realisation_tag_base)
admin.site.register(Order_extern_base)
admin.site.register(Order_extern_realisation_base)
admin.site.register(Product_order_extern_realisation_base)

# Register your models here.
