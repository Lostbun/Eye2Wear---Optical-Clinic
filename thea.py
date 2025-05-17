import numpy as np

a = np.arange(10, 1, -2) 
print("\n A sequential array with a negative step: \n",a)

newarr = a[np.array([3, 1, 2 ])]
print("\n Elements at these indices are:\n",newarr)