from django.contrib import admin
from django.contrib.admin import AdminSite


from .models import Product_base, Product_order_base, Order_base, Debtor_base, Client_base, Tag_base, \
    Realisation_tag_base, Order_extern_base, Order_extern_realisation_base, Product_order_extern_realisation_base

AdminSite.site_header = "SYNOD alpha 1.02 Django administration"

class TagInLine(admin.StackedInline):
    extra = 5
class Product_Tag_InLine(TagInLine):
    model = Tag_base

class Realisation_Tag_InLine(TagInLine):
    model = Realisation_tag_base

class Product_base_admin(admin.ModelAdmin):
    list_display = ('pk' , 'product_name', 'quantity', 'price' )
    list_filter = ['tag', 'tech_tag']
    search_fields = ['product_name']
    filter_horizontal = ('tag', 'tech_tag')

admin.site.register(Product_base, Product_base_admin)
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
