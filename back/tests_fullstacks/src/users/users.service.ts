import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  // Créer un utilisateur
  create(username: string, mdp: string): User {
    const user: User = {
      id: this.idCounter++,
      username,
      mdp,
    };
    this.users.push(user);
    return user;
  }

  // Lister tous les utilisateurs
  findAll(): User[] {
    return this.users;
  }

  // Trouver un utilisateur par ID
  findOne(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  // Trouver par username
  findByUsername(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }

  // Supprimer un utilisateur
  remove(id: number): boolean {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
  update(id: number, data: Partial<User>): User {
    const user = this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (data.username !== undefined) {
      user.username = data.username;
    }
    if (data.mdp !== undefined) {
      user.mdp = data.mdp;
    }

    return user;
  }

  login(username: string, mdp: string): User {
    const user = this.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException("Nom d'utilisateur incorrect");
    }

    if (user.mdp !== mdp) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    return user;
  }
}
