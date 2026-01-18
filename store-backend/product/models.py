from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=50, unique=True, allow_unicode=True) 

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    stock_quantity = models.IntegerField(default=0)
    description = models.TextField(blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    is_active = models.BooleanField(default=True)
    stock = models.IntegerField(default=100, verbose_name="재고 수량")  # 재고 수량 필드 추가, default=100

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name