import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  note!: Note;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private noteService: NoteService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id')

      this.note = this.noteService.getNote(idParam!)!;
    })
  }

  onFormSubmit(form: NgForm) {

    if (form.invalid) return
    
    // const note = new Note(form.value.title, form.value.content)

    // this.noteService.addNote(note)
    this.router.navigateByUrl("/notes")
    this.noteService.updateNote(this.note.id, form.value)
    this.notificationService.show('Note Updated!')
  }

  deleteNote() {
    this.noteService.deleteNote(this.note.id)
    this.router.navigateByUrl("/notes")
    this.notificationService.show('Note Deleted.')

  }

}
