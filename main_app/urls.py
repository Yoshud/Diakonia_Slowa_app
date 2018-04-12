from django.urls import path, re_path
from . import views

app_name = 'main_app'
urlpatterns = [
    path('', views.main_page, name='main_page'),
    path('order', views.order, name='order'),
    path('manage', views.manage, name='manage'),
    path('order/pay_method', views.pay_method, name='pay method'),
    path('order/pay_method/calculator', views.calculator, name='in_cash'),
    path('order/pay_method/by_bank_card', views.bank_card, name='by_transfer'),
    re_path(r'^ajax/$', views.ajax_product_view, name='ajax-product-view'),
    path('add_order', views.ajax_add_order_view, name='ajax-add-order-view'),
    path('order/<int:pk>/', views.single_order, name='single_order'),
    path('email_validate', views.ajax_email_validate_view, name='email_validate'),
    path('order/pay_method/by_bank_card/redirect', views.bank_card_redirect, name='by_bank_card_redirect'),
]

#, name='by_transfer_redirect'