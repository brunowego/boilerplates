import joblib
import sys


def eprint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


class IrisClassifier(object):
    def __init__(self):
        self.model = joblib.load('IrisClassifier.sav')
        # self.class_names = ["iris-setosa","iris-vericolor","iris-virginica"]

    def predict(self, X, features_names):
        eprint('--------------------')
        eprint('Input dict')
        eprint(X)
        eprint('--------------------')

        return self.model.predict_proba(X)
