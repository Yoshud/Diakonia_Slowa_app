from django.urls import path
from . import views
app_name = 'main_app'
urlpatterns = [
    path('', views.main_page, name='main_page'),
    path('order', views.order, name='order'),
    path('manage', views.menage, name='manage'),
    path('order/pay_method', views.pay_method, name='pay method'),
    path('order/pay_method/calculator', views.calculator, name='in_cash'),
    path('order/pay_method/by_bank_card', views.calculator, name='by_transfer'),
]