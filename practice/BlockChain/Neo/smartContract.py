from boa.interop.Neo.Runtime import Log, Notify
from boa.interop.Neo.Storage import Get, Put, GetContext

def Main():
    context = GetContext()

    # This is the storage key we use in this example
    item_key = 'test-storage-key'

    # Try to get a value for this key from storage
    item_value = Get(context, item_key)
    msg = ["Value read from storage:", item_value]
    Notify(msg)

    if len(item_value) == 0:
        Notify("Storage key not yet set. Setting to 1")
        item_value = 1

    else:
        Notify("Storage key already set. Incrementing by 1")
        item_value += 1

    # Store the new value
    Put(context, item_key, item_value)
    msg = ["New value written into storage:", item_value]
    Notify(msg)

    return item_value
