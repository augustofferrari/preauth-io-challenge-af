from typing import List


def combinations_generator(elements: List[int], length: int):
    for i in range(len(elements)):
        if length == 1:
            yield [elements[i], ]
        else:
            for next in combinations_generator(elements[i+1:len(elements)], length-1):
                yield [elements[i], ] + next


def get_subset_numbers(
    numbers: List[int], total: int, subset_size: int = 2, results: int = 1
) -> List[int]:
    """ Returns a list of subsets from a list of numbers, where the sum
    of each subset is equal to the 'total' arg.

    Args:
        numbers: (int[]) list of numbers to iterate
        total: (int) the subsets sum should be equal to this arg
        subset_size: (int) the size of the result subset
        results: (int) how many subsets should be return
    Returns:
        list[list[int]]: a list that contains the result subsets if
            the results args is > 1.
        list[int]: a subset if the results args is 1
    """
    if len(numbers) < subset_size:
        raise Exception(
            "The number array shoulb be greatter than the subset size")
    if results == 0:
        return None

    result = []
    for element in combinations_generator(numbers, subset_size):
        if sum(element) == total:
            result.append(element)

        if len(result) == results:
            if results == 1:
                return result[0]
            return result
