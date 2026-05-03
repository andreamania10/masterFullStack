import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Noticia {
  title: string,
  image: string,
  text: string,
  date: string
}
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
  news: Noticia[] = [
    {
      title: 'Primera noticia',
      image: 'https://picsum.photos/seed/picsum/536/354',
      text: 'Viaja las montañas del Pirineo. Tranquilidad y serenidad en estado puro.',
      date: '2026-05-03'
    },
    {
      title: 'Segunda noticia',
      image: 'https://picsum.photos/id/1060/536/354?blur=2',
      text: 'Desayuna un buen café en la cafetería Aromas. En Avinguda Madrid 199, Barcelona .',
      date: '2026-05-05'
    },
  ];

  newNews: Noticia = {
    title: '',
    image: '',
    text: '',
    date: ''
  };

  agregarNoticia() {
    if (!this.newNews.title || !this.newNews.image ||
      !this.newNews.text || !this.newNews.date) {
      alert('Todos los campos son obligatorios');
      return;
    }
    this.news.push({ ...this.newNews });

    this.newNews = { title: '', image: '', text: '', date: '' };
  }

}
