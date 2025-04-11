from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate
from utils import hash_password
from sqlalchemy.exc import IntegrityError

def create_user(db: Session, user: UserCreate):
    hashed_pw = hash_password(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        password=hashed_pw,
        full_name=user.full_name
    )
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError as e:
        db.rollback()
        if hasattr(e.orig, 'diag') and e.orig.diag.constraint_name:
            constraint = e.orig.diag.constraint_name
            if 'username' in constraint:
                raise ValueError("Nome de usuário já está em uso.")
            elif 'email' in constraint:
                raise ValueError("E-mail já está em uso.")
        raise ValueError("Erro de integridade ao criar usuário.")

