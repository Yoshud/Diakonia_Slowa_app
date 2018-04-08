from django.contrib import admin
from django.contrib.admin import AdminSite

from .models import Product_base, Product_order_base, Order_base, Debtor_base, Client_base, Tag_base, \
    Realisation_tag_base, Order_extern_base, Order_extern_realisation_base, Product_order_extern_realisation_base, \
    Tech_tag_base

AdminSite.site_header = "SYNOD alpha 1.02 Django administration"

class Product_InLine(admin.TabularInline):
    model = Product_order_base
    extra = 0

class Debtor_InLine(admin.StackedInline):
    model = Debtor_base
    extra = 0

class Product_base_admin(admin.ModelAdmin):
    list_display = ('pk', 'product_name', 'quantity', 'price')
    list_filter = ['tag', 'tech_tag']
    search_fields = ['product_name']
    filter_horizontal = ('tag', 'tech_tag')


class Client_base_admin(admin.ModelAdmin):
    list_display = ('firstname', 'surname', 'email')
    inlines = [Debtor_InLine]
    search_fields = ['firstname', 'surname', '^email']


class Debtor_base_admin(admin.ModelAdmin):
    list_display = ('client', 'order', 'if_settle')
    list_filter = ['if_settle']
    search_fields = ['client__firstname', 'client__surname']


class Order_base_admin(admin.ModelAdmin):
    list_display = ('date',)
    inlines = [Product_InLine]
    list_filter = ['date', 'debtor__if_settle']
    search_fields = ['product_order_base__product__product_name']


class Product_order_base_admin(admin.ModelAdmin):
    list_display = ('product', 'price_in_moment', 'quantity', 'order')
    search_fields = ['product__product_name']
    list_filter = ['order__date', 'product__tag', 'product__tech_tag']


admin.site.register(Product_base, Product_base_admin)
admin.site.register(Product_order_base, Product_order_base_admin)
admin.site.register(Order_base, Order_base_admin)
admin.site.register(Debtor_base, Debtor_base_admin)
admin.site.register(Client_base, Client_base_admin)
admin.site.register(Tag_base)
admin.site.register(Tech_tag_base)
admin.site.register(Realisation_tag_base)
admin.site.register(Order_extern_base)
admin.site.register(Order_extern_realisation_base)
admin.site.register(Product_order_extern_realisation_base)

# Register your models here.
