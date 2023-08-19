from django.urls import path

from ..views import bookProduct_views as views

urlpatterns = [
    path('', views.getBookProducts, name="Products"),

    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('top/', views.getTopProducts, name='top-products'),
    path('<str:pk>', views.getProduct, name="Book Product"),

    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<int:pk>/', views.deleteProduct, name="product-delete"),
]
