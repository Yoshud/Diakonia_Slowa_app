from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.http import Http404
from django.urls import reverse
from django.template import loader
from .models import Product_base, Order_base
from django.views.generic import TemplateView, View
from annoying.decorators import ajax_request
from django.core import serializers
from django.utils import timezone
import datetime

def products_to_table(products):
    name = []
    price = []
    quantity = []
    for product in products:
        name.append(product.product_name)
        price.append(product.price)
        quantity.append(product.quantity)
    return {
        'product_name': name,
        'price': price,
        'quantity': quantity,
    }
def sought_products(string):
    products = Product_base.objects.filter(product_name__icontains = string)
    return products_to_table(products)

def abridged_orders_to_table():
    orders = Order_base.objects.filter(date__gte=(timezone.now()-datetime.timedelta(hours=12)), date__lte=timezone.now())
    hour = []
    order_sum = []
    id = []

    for order in orders:
        hour.append(order.date.hour)
        order_sum = sum(order.sales_base_set.all().price_in_moment * order.sales_base_set.all().quantity)
        id = order.pk

    return {
        'hour': hour,
        'sum': order_sum,
        'id': id,
    }


def main_page(request):

    products = Product_base.objects.order_by('-product_name')
    orders = Order_base.objects.order_by('-date')
    template = loader.get_template('main_app/main_page_products.html')

    if request.POST:
        it = str(request.POST['search'])
        products = Product_base.objects.filter(product_name__contains=it)
        context = {
            'products': products,
            'orders': orders,
        }

        HttpResponse(template.render(context, request))
    else:
        context = {
          'products': products,
           'orders': orders,
        }
    return HttpResponse(template.render(context, request))

class AjaxProductView(View):
    def post(self, request, **kwargs):
        search_val = request.POST.get('search_value', None)
        products = Product_base.objects.order_by('-product_name')
        return JsonResponse(sought_products(search_val))

ajax_product_view = AjaxProductView.as_view()


def order(request):
    return render(request, 'main_app/order.html')

def menage(request):
    return render(request, 'main_app/manage.html')

def calculator(request):
    return render(request, 'main_app/calculator.html')

def pay_method(request):
    return render(request, 'main_app/pay_method.html')


