from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.http import Http404
from django.urls import reverse
from django.template import loader
from .models import Product_base, Order_base

def main_page(request):

    products = Product_base.objects.order_by('-product_name')
    orders = Order_base.objects.order_by('-date')
    template = loader.get_template('main_app/main_page.html')

    if request.POST:
        it = str(request.POST['search'])
        products = Product_base.objects.filter(product_name__contains=it)
        context = {
            'products': products,
            'orders': orders,
        }
    else:
        context = {
          'products': products,
           'orders': orders,
        }
    return HttpResponse(template.render(context, request))


def order(request):
    return render(request, 'main_app/order.html')

def menage(request):
    return render(request, 'main_app/manage.html')

def calculator(request):
    return render(request, 'main_app/calculator.html')

def pay_method(request):
    return render(request, 'main_app/pay_method.html')


"""
def order(request, pk):
    question = get_object_or_404(Product_base, pk = pk)
    return render(request, 'polls/detail.html', {'question' : question})

def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/results.html', {'question': question})

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choices_set.get(pk=request.POST['choice'])
    except (KeyError, Choices.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
    
    """