from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Product_base, Order_base, Product_order_base, Debtor_base
from django.views.generic import View
from django.utils import timezone
import datetime
from django.views import generic

import json


def products_to_table(products):
    name = []
    price = []
    quantity = []
    pk = []
    for product in products:
        name.append(product.product_name)
        price.append(product.price)
        quantity.append(product.quantity)
        pk.append(product.pk)
    return {
        'product_name': name,
        'price': price,
        'quantity': quantity,
        'pk': pk,
    }


def sought_products(string):
    products = Product_base.objects.filter(product_name__icontains=string).order_by("product_name")
    return products_to_table(products)

def abridged_orders():
    orders = Order_base.objects.filter(date__gte=(timezone.now() - datetime.timedelta(hours=12)), date__lte=timezone.now())
    return orders
def abridged_orders_with_sum():
    orders = abridged_orders()
    sum_tmp = []
    list_of_sum = []
    return_tuples = []
    for order in orders:
        for sale in order.sales_base_set.all():
            # print(order.date.time(), sale.quantity, sale.price_in_moment, sale.product.product_name)
            sum_tmp.append(sale.quantity * sale.price_in_moment)
        list_of_sum.append(sum(sum_tmp))
        return_tuples.append((order, sum(sum_tmp)))
        sum_tmp = []

    return {
        "tuples": return_tuples,
        "sum_of_all": sum(list_of_sum),
    }
def abridged_orders_to_table():
    orders = abridged_orders()
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
    return render(request, 'main_app/main_page_products.html' , abridged_orders_with_sum())


class AjaxProductView(View):
    def post(self, request, **kwargs):
        search_val = request.POST.get('search_value', '')
        products = Product_base.objects.order_by('-product_name')
        return JsonResponse(sought_products(search_val))


ajax_product_view = AjaxProductView.as_view()

def string_list_field(request, name):
    return request.POST.get(name, '').split(",")

def float_list_field_parse(request, name):
    string_list = string_list_field(request, name)
    return [float(el) for el in string_list]

def int_list_field_parse(request, name):
    string_list = string_list_field(request, name)
    return [int(el) for el in string_list]

def add_order_to_base(basket):
    order_var = Order_base(date = timezone.now())
    order_var.save()
    for it, pk in enumerate(basket["id"]) :
        #odpisanie zamówienia z magazynu
        product = Product_base.objects.get(pk = pk)
        product.quantity -= basket["quantity"][it]
        product.save()
        #podzielenie zamówienia na produkty
        product_sale = Product_order_base(product = product, order = order_var, price_in_moment=product.price, quantity=basket["quantity"][it])
        product_sale.save()
def ret_form_of_payment(order):

        try:
            if order.debtor.if_settle :
                return "Przlew (uregulowane)"
            else:
                return "Przelew (nieuregulowane)"
        except Debtor_base.DoesNotExist:
            return "Gotówką"
def ret_client_data(order):
    try:
        return order.debtor.client.firstname +" " + order.debtor.client.surname + "email: "+ order.debtor.client.email
    except Debtor_base.DoesNotExist:
        return "brak danych"
def single_order_diction_fun(order_id):
    order = get_object_or_404(Order_base, pk = order_id)
    tuples = []
    product_sum = []
    sales_tuples = []
    for order_product in order.product_order_base_set.all():
        single_product_sum = order_product.quantity * order_product.price_in_moment
        product_sum.append(single_product_sum)
        tuples.append( (order_product , single_product_sum, sales_count(order_product.product.pk)) )
        #sales_tuples.append(sales_count(order_product.pk))
    print(tuples)
    order_sum = sum(product_sum)
    print(ret_form_of_payment(order))
    diction = {
        "order": order,
        "tuples": tuples,
        "order_sum": order_sum,
        "form_of_payment": ret_form_of_payment(order),
        "client_data": ret_client_data(order),
               }
    return diction
def sales_count(product_id):
    hours = 7 * 24 + 12
    #print(product_id)
    sales = Product_order_base.objects.filter(product__pk__exact=product_id, order__date__gte = (timezone.now() - datetime.timedelta(hours=hours)))
    print(Product_order_base.objects.filter(product__pk__exact = product_id, order__date__gte = (timezone.now() - datetime.timedelta(hours=hours))))
    sales_quantity = sales.all().count()
    sum_of_sales_product = 0
    for sale in sales:
        sum_of_sales_product += sale.quantity
        print("pętla:" + str(sum_of_sales_product))
    #return ( sales_quantity, sum_of_sales_product )
    print("koniec: " + str(sum_of_sales_product))
    return sum_of_sales_product

class AjaxAddOrderView(View):
    def post(self, request, **kwargs):
        #pobieranie koszyka z skyptu po stronie klienta
        basket = {
            "product_name": string_list_field(request, "product_name"),
            "id": int_list_field_parse(request, "id"),
            "quantity": int_list_field_parse(request, "quantity"),
            "price": float_list_field_parse(request, "price"),
        }
        add_order_to_base(basket)
        return JsonResponse(basket)


ajax_add_order_view = AjaxAddOrderView.as_view()


def order(request):
    return render(request, 'main_app/order_ext.html')


def manage(request):
    return render(request, 'main_app/manage.html')


def calculator(request):
    return render(request, 'main_app/calculator.html')


def bank_card(request):
    return render(request, 'main_app/by_bank_card.html')


def pay_method(request):
    return render(request, 'main_app/pay_method.html')

class Single_Order(generic.DetailView):
    model = Order_base
    template_name = 'main_app/single_order.html'
    context_object_name = 'order'

def single_order(request, pk):
    return render(request, 'main_app/single_order.html', single_order_diction_fun(pk))