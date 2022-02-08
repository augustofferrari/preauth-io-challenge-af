import pytest

from game_01 import get_subset_numbers

test_data = [
    # (list of numbers, total expected, subset size, results numbers,
    # expected result)
    # if the results numbers is >1, returns a list of lists
    ([1, 2, 3, 3, 4, 5], 4, 2, 0, None),
    # if the results numbers is >1, returns a list of lists
    ([1, 2, 3, 3, 4, 5], 4, 2, 2, [[1, 3], [1, 3]]),
    # in case of 1 results, returns only a list
    ([2, 5, 8, 14, 0], 10, 2, 1, [2, 8]),
    # Return None when there are no results
    ([2, 5, 8, 14, 0], 100, 2, 1, None),
    ([1, 5, 3, 7, 1], 8, 2, 3, [[1, 7], [5, 3], [7, 1]]),  # Returns 3 subsets
]


@pytest.mark.parametrize(
    "numbers, total, subset_size, results, expected", test_data
)
def test_get_subset_numbers(numbers, total, subset_size, results, expected):
    result = get_subset_numbers(numbers, total, subset_size, results)
    assert expected == result
