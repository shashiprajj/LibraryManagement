from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Book, Borrower
from .serializers import BookSerializer, BorrowerSerializer
from django.views.decorators.csrf import csrf_exempt

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @csrf_exempt
    @action(detail=True, methods=['post'])
    def borrow_book(self, request, pk=None):
        book_id = pk  # Extract book ID from URL
        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            return Response({'status': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

        if not book.availability:
            return Response({'status': 'Book not available'}, status=status.HTTP_400_BAD_REQUEST)

        borrower_data = request.data.get('borrower')
        if not borrower_data:
            return Response({'status': 'Borrower data not provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            borrower = Borrower.objects.get(name=borrower_data['name'], email=borrower_data['email'])
        except Borrower.DoesNotExist:
            return Response({'status': 'Borrower not found'}, status=status.HTTP_404_NOT_FOUND)

        borrower.borrowed_books.add(book)
        book.availability = False
        book.save()
        borrower.save()
        return Response({'status': 'Book borrowed successfully'}, status=status.HTTP_200_OK)

    @csrf_exempt
    @action(detail=True, methods=['post'])
    def return_book(self, request, pk=None):
        book_id = pk  # Extract book ID from URL
        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            return Response({'status': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

        if book.availability:
            return Response({'status': 'Book already available'}, status=status.HTTP_400_BAD_REQUEST)

        borrower_data = request.data.get('borrower')
        if not borrower_data:
            return Response({'status': 'Borrower data not provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            borrower = Borrower.objects.get(name=borrower_data['name'], email=borrower_data['email'])
        except Borrower.DoesNotExist:
            return Response({'status': 'Borrower not found'}, status=status.HTTP_404_NOT_FOUND)

        if book not in borrower.borrowed_books.all():
            return Response({'status': 'Book not borrowed by this borrower'}, status=status.HTTP_400_BAD_REQUEST)

        borrower.borrowed_books.remove(book)
        book.availability = True
        book.save()
        borrower.save()
        return Response({'status': 'Book returned successfully'}, status=status.HTTP_200_OK)


class BorrowerViewSet(viewsets.ModelViewSet):
    queryset = Borrower.objects.all()
    serializer_class = BorrowerSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
