from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Book

# Create your views here.
# Helper to convert Book to dict
def book_to_dict(book):
    return {
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'isbn': book.isbn,
        'published_date': book.published_date,
        'price': str(book.price),
    }

@csrf_exempt
def book_list(request):
    if request.method == 'GET':
        books = Book.objects.all()
        data = [book_to_dict(book) for book in books]
        return JsonResponse(data, safe=False)
    
    elif request.method == 'POST':
        data = json.loads(request.body)
        book = Book.objects.create(
            title=data['title'],
            author=data['author'],
            isbn=data['isbn'],
            published_date=data['published_date'],
            price=data['price']
        )
        return JsonResponse(book_to_dict(book), status=201)

@csrf_exempt
def book_detail(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return JsonResponse({'error': 'Book not found'}, status=404)

    if request.method == 'GET':
        return JsonResponse(book_to_dict(book))
    
    elif request.method == 'PUT':
        data = json.loads(request.body)
        book.title = data['title']
        book.author = data['author']
        book.isbn = data['isbn']
        book.published_date = data['published_date']
        book.price = data['price']
        book.save()
        return JsonResponse(book_to_dict(book))

    elif request.method == 'DELETE':
        book.delete()
        return JsonResponse({'message': 'Book deleted successfully'})
