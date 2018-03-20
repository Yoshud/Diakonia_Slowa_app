from django.urls import path, re_path, include
from . import views
from django.urls import reverse
from django.conf.urls import url
from django.urls import include
app_name = 'main_app'
urlpatterns = [
    path('', views.main_page, name='main_page'),
    path('order', views.order, name='order'),
    path('manage', views.menage, name='manage'),
    path('order/pay_method', views.pay_method, name='pay method'),
    path('order/pay_method/calculator', views.calculator, name='in_cash'),
    path('order/pay_method/by_bank_card', views.calculator, name='by_transfer'),
    re_path(r'^ajax/$', views.ajax_product_view, name='ajax-product-view'),
]


def javascript_settings():
    return {
        'page_title': 'Home',
        'page_version': '1.9.20',
        'css': {
            'white': './css/white.css',
            'black': './css/black.css',
            'print': './css/print.css',
        },
        'default_css': 'white',
    }
