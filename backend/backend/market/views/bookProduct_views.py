from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import BookProduct, Review
from ..serializers import BookProductSerializer
from rest_framework.response import Response

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import render
from rest_framework import status


@api_view(['GET'])
def getBookProducts(request):
    query = request.GET.get('keyword')  
    if query is None or query == '':
        bookProducts = BookProduct.objects.all()
    else:
        bookProducts = BookProduct.objects.filter(title__icontains=query).order_by('-createdAt')
    serializer = BookProductSerializer(bookProducts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTopProducts(request):
    bookProducts = BookProduct.objects.filter(rating__gte=4).order_by('-rating')[:5]
    serializer = BookProductSerializer(bookProducts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    bookProducts = BookProduct.objects.get(id=pk)
    serializer = BookProductSerializer(bookProducts, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    bookProduct = BookProduct.objects.create(
        user_id=user,
        title='Sample Title',
        subtitle='Sample SubTitle',
        author='Sample Author',
        published='2023-06-21',
        publisher='Sample Publisher',
        pages=0,
        price=0,
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = BookProductSerializer(bookProduct, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    bookProduct = BookProduct.objects.get(id=pk)

    bookProduct.title = data['title']
    bookProduct.subtitle = data['subtitle']
    bookProduct.author = data['author']
    bookProduct.published = data['published']
    bookProduct.publisher = data['publisher']
    bookProduct.pages = data['pages']
    bookProduct.price = data['price']
    bookProduct.countInStock = data['countInStock']
    bookProduct.category = data['category']
    bookProduct.description = data['description']

    bookProduct.save()

    serializer = BookProductSerializer(bookProduct, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    bookProduct = BookProduct.objects.get(id=pk)
    bookProduct.delete()
    return Response('Producted Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    bookProduct_id = data['bookProduct_id']
    bookProduct = BookProduct.objects.get(id=bookProduct_id)

    bookProduct.image = request.FILES.get('image')
    bookProduct.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    bookProduct = BookProduct.objects.get(id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = bookProduct.review_set.filter(user_id=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user_id=user,
            bookProduct_id=bookProduct,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = bookProduct.review_set.all()
        bookProduct.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        bookProduct.rating = total / len(reviews)
        bookProduct.save()

        return Response('Review Added')
