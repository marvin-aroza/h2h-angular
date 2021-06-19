import { Component, OnInit } from '@angular/core';

//service
import { DonateService } from 'src/app/shared/Services/donate.service'
import { NewsService } from 'src/app/shared/Services/news.service'
import { PostService } from 'src/app/shared/Services/post.service'
import { EventsService } from 'src/app/shared/Services/events.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //variables
  donationDetails:any
  totalDonation:any
  newsCount:any
  postCount:any
  eventCount:any

  constructor(
    private donateService: DonateService,
    private newsService: NewsService,
    private postService: PostService,
    private eventService: EventsService,
  ) {
    this.getDonationCountDetails();
    this.getNewsCount();
    this.getPostCount();
    this.getEventCount();
  }

  ngOnInit(): void {
  }

  getDonationCountDetails() {
    this.donateService.getDonationDetailscount().subscribe((res:any) => {
      console.log(res);
      this.donationDetails = res.data[0]
      this.totalDonation = res.data[1]
    });
  }

  getNewsCount() {
    this.newsService.getNewCount().subscribe(res => {
      this.newsCount = res.data
    });
  }

  getPostCount() {
    this.postService.getPostCount().subscribe(res => {
      this.postCount = res.data
    });
  }

  getEventCount() {
    this.eventService.getEventCount().subscribe(res => {
      this.eventCount = res.data
    });
  }

}
