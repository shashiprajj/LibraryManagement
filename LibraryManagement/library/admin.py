from django.contrib import admin
from django.contrib import admin
from .models import Book, Borrower
# Register your models here.

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'isbn', 'publication_date', 'availability')
    search_fields = ('title', 'author', 'isbn')
    list_filter = ('availability', 'publication_date')

@admin.register(Borrower)
class BorrowerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')
    search_fields = ('name', 'email')
    filter_horizontal = ('borrowed_books',)
