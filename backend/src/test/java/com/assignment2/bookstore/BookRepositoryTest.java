package com.assignment2.bookstore;

import com.assignment2.TestCreationFactory;
import com.assignment2.bookstore.model.Book;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class BookRepositoryTest {

    @Autowired
    private BookRepository repository;

    @BeforeEach
    public void beforeEach() {
        repository.deleteAll();
    }

    @Test
    public void testMock() {
        Book bookSaved = repository.save(Book.builder().title("whatever").build());

        assertNotNull(bookSaved);

        assertThrows(DataIntegrityViolationException.class, () -> {
            repository.save(Book.builder().build());
        });
    }

    @Test
    public void testFindAll() {
        List<Book> books = TestCreationFactory.listOf(Book.class);
        repository.saveAll(books);
        List<Book> all = repository.findAll();
        assertEquals(books.size(), all.size());
    }
}