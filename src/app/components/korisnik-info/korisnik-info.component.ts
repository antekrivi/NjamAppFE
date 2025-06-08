import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../../services/korisnik.service';
import { Router } from '@angular/router';
import { UserInfoDTO } from '../../interfaces/userInfoDTO';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-korisnik-info',
  standalone: false,
  templateUrl: './korisnik-info.component.html',
  styleUrl: './korisnik-info.component.css'
})
export class KorisnikInfoComponent implements OnInit {

  userInfo?: UserInfoDTO;
  errorMessage?: string;

  constructor(private userService: KorisnikService) { }

  ngOnInit(): void {
    this.userService.getUserFromToken().subscribe({
      next: (data) => this.userInfo = data,
      error: (err) => this.errorMessage = err.message
    });
    console.log(this.errorMessage);
  }
}
