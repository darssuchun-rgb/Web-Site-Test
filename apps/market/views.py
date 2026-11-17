from django.shortcuts import render
from .models import Products , SiteInfo

# Create your views here.
def index(request):
    mahsulotlar = Products.objects.all()
    info = SiteInfo.objects.first()

    context = {
        'mahsulotlar':mahsulotlar,
        'info':info,
    }




    return render(request , 'index.html', context)