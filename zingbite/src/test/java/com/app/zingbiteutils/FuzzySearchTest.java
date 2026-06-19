package com.app.zingbiteutils;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class FuzzySearchTest {

    @Test
    public void testLevenshteinDistanceNulls() {
        assertEquals(Integer.MAX_VALUE, FuzzySearch.levenshteinDistance(null, "abc"));
        assertEquals(Integer.MAX_VALUE, FuzzySearch.levenshteinDistance("abc", null));
        assertEquals(Integer.MAX_VALUE, FuzzySearch.levenshteinDistance(null, null));
    }

    @Test
    public void testLevenshteinDistanceEmpty() {
        assertEquals(0, FuzzySearch.levenshteinDistance("", ""));
        assertEquals(3, FuzzySearch.levenshteinDistance("", "abc"));
        assertEquals(3, FuzzySearch.levenshteinDistance("abc", ""));
    }

    @Test
    public void testLevenshteinDistanceCaseAndTrim() {
        assertEquals(0, FuzzySearch.levenshteinDistance("  abc  ", "ABC"));
        assertEquals(3, FuzzySearch.levenshteinDistance("kitten", "sitting"));
        assertEquals(1, FuzzySearch.levenshteinDistance("abc", "ab"));
    }

    @Test
    public void testContainsFuzzyNulls() {
        assertFalse(FuzzySearch.containsFuzzy(null, "abc"));
        assertFalse(FuzzySearch.containsFuzzy("abc", null));
        assertFalse(FuzzySearch.containsFuzzy(null, null));
    }

    @Test
    public void testContainsFuzzyEmpty() {
        assertTrue(FuzzySearch.containsFuzzy("abc", ""));
        assertTrue(FuzzySearch.containsFuzzy("", ""));
        assertFalse(FuzzySearch.containsFuzzy("", "abc"));
    }

    @Test
    public void testContainsFuzzyDirectSubstring() {
        assertTrue(FuzzySearch.containsFuzzy("hello world", "hello"));
        assertTrue(FuzzySearch.containsFuzzy("hello world", "world"));
        assertTrue(FuzzySearch.containsFuzzy("hello world", "hello world"));
    }

    @Test
    public void testContainsFuzzyThresholds() {
        assertTrue(FuzzySearch.containsFuzzy("bat", "cat")); // matches (dist 1, threshold 1)
        assertFalse(FuzzySearch.containsFuzzy("boat", "cat")); // no match (dist 2, threshold 1)

        assertTrue(FuzzySearch.containsFuzzy("aples", "apples")); // matches (dist 1, threshold 2)
        assertTrue(FuzzySearch.containsFuzzy("apls", "apples")); // matches (dist 2, threshold 2)
        assertFalse(FuzzySearch.containsFuzzy("aps", "apples")); // no match (dist 3, threshold 2)
    }
}
