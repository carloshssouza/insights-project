import streamlit as st
from interface import Interface
from user import User


class Control:
    def __init__(self):
        self.st = st
        self.interface = Interface(self.st)

    @staticmethod
    def get_profile(_user, _pass):
        return User("login").login(_user, _pass)