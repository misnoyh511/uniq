import {Component, OnInit} from '@angular/core';
import {ReportsService} from '../reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: 'analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  providers: [ReportsService]
})
export class AnalyticsComponent implements OnInit {
  sessions: string;
  users: string;
  data: any = {};
  options: any = {};
  options1: any = {};
  options2: any = {};
  openDropdown = false;
  showAvgtip = false;
  showUsertip = false;
  showMsgtip = false;
  showSessiontip = false;
  selectValue1 = false;
  selectValue2 = false;
  selectValue3 = false;
  avg_time = 0;
  duration = 'Yesterday';
  today = new Date();
  startDate: any;
  endDate: any;
  daterange: any = {};
  public dateOptions: any = {
    locale: {format: 'MM/DD/YYYY'},
    alwaysShowCalendars: false,
  };

  constructor(private reportsService: ReportsService) {

  }

  ngOnInit() {
    this.endDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (this.today.getDate() + 1)).slice(-2);
    if (this.duration === 'Yesterday') {
      this.today.setDate(this.today.getDate() - 1);
      this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
        ('0' + (this.today.getDate() + 1)).slice(-2);
    }
    this.onLoadData(this.startDate, this.endDate);
  }

  selectData(data) {
    this.duration = data;
    this.openDropdown = !this.openDropdown;
    this.today = new Date();
    this.endDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + (this.today.getDate() + 1)).slice(-2);
    if (this.duration === 'Yesterday') {
      this.today.setDate(this.today.getDate() - 1);
      this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
        ('0' + (this.today.getDate() + 1)).slice(-2);
    } else if (this.duration === 'Last 7 Days') {
      this.today.setDate(this.today.getDate() - 7);
      this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
        ('0' + (this.today.getDate() + 1)).slice(-2);
    } else if (this.duration === 'Last 30 Days') {
      this.today.setDate(this.today.getDate() - 30);
      this.startDate = this.today.getFullYear() + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2) + '-' +
        ('0' + (this.today.getDate() + 1)).slice(-2);
    }
    this.onLoadData(this.startDate, this.endDate);
  }

  onLoadData(startDate, endDate) {
    this.reportsService.getAllSession(startDate, endDate).subscribe((response) => {
      this.sessions = response.data[0].sessions;
      this.options = {
        title: {
          text: ''
        },

        subtitle: {
          text: ''
        },

        yAxis: {
          title: {
            text: ''
          }
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010,
          }
        },

        series: [{
          name: 'Current Session',
          data: [33934, 52503, 57177, 69658, 97031, 119931, 88931, 154175]
        }, {
          name: 'Last Session',
          data: [43934, 40503, 67177, 55658, 87031, 132009, 119931, 124175],
          dashStyle: 'dot'

        }],

        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      },
        this.options1 = {
          title: {
            text: ''
          },

          subtitle: {
            text: ''
          },

          yAxis: {
            title: {
              text: ''
            }
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },

          plotOptions: {
            series: {
              label: {
                connectorAllowed: false
              },
              pointStart: 2010
            }
          },

          series: [{
            name: 'Current Session',
            data: [20000, 23000, 28000, 21000, 29000, 21000, 27000]
          }, {
            name: 'Last Session',
            data: [23000, 26000, 24000, 26000, 25000, 27000, 21000],
            dashStyle: 'dot'
          }],

          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          }

        };
      this.options2 = {
        yAxis: {
          title: {
            text: 'Users'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        series: [{
          name: 'Installation',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      };
    }, (err) => {
      console.log(err);
    });

    this.reportsService.getTotalUsers(startDate, endDate).subscribe((response) => {
      this.users = response.data[0].clients;
      this.options = {
        title: {
          text: ''
        },

        subtitle: {
          text: ''
        },

        yAxis: {
          title: {
            text: ''
          }
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010,
          }
        },

        series: [{
          name: 'Current Session',
          data: [33934, 52503, 57177, 69658, 97031, 119931, 88931, 154175]
        }, {
          name: 'Last Session',
          data: [43934, 40503, 67177, 55658, 87031, 132009, 119931, 124175],
          dashStyle: 'dot'

        }],

        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      },
        this.options1 = {
          title: {
            text: ''
          },

          subtitle: {
            text: ''
          },

          yAxis: {
            title: {
              text: ''
            }
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },

          plotOptions: {
            series: {
              label: {
                connectorAllowed: false
              },
              pointStart: 2010
            }
          },

          series: [{
            name: 'Current Session',
            data: [20000, 23000, 28000, 21000, 29000, 21000, 27000]
          }, {
            name: 'Last Session',
            data: [23000, 26000, 24000, 26000, 25000, 27000, 21000],
            dashStyle: 'dot'
          }],

          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          }

        };
      this.options2 = {
        yAxis: {
          title: {
            text: 'Users'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        series: [{
          name: 'Installation',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      };
    }, (err) => {
      console.log(err);
    });

    this.reportsService.getAvgTtime(startDate, endDate).subscribe((response) => {
      this.data = response.data;
      let sum = 0;
      for (const i in response.data) {
        sum = sum + response.data[i].avg_time;
      }
      this.avg_time = sum / response.data.length;


      this.options = {
        title: {
          text: ''
        },

        subtitle: {
          text: ''
        },

        yAxis: {
          title: {
            text: ''
          }
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010,
          }
        },

        series: [{
          name: 'Current Session',
          data: [33934, 52503, 57177, 69658, 97031, 119931, 88931, 154175]
        }, {
          name: 'Last Session',
          data: [43934, 40503, 67177, 55658, 87031, 132009, 119931, 124175],
          dashStyle: 'dot'

        }],

        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      },
        this.options1 = {
          title: {
            text: ''
          },

          subtitle: {
            text: ''
          },

          yAxis: {
            title: {
              text: ''
            }
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },

          plotOptions: {
            series: {
              label: {
                connectorAllowed: false
              },
              pointStart: 2010
            }
          },

          series: [{
            name: 'Current Session',
            data: [20000, 23000, 28000, 21000, 29000, 21000, 27000]
          }, {
            name: 'Last Session',
            data: [23000, 26000, 24000, 26000, 25000, 27000, 21000],
            dashStyle: 'dot'
          }],

          responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }]
          }

        };
      this.options2 = {
        yAxis: {
          title: {
            text: 'Users'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        series: [{
          name: 'Installation',
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }
      };
    }, (err) => {
      console.log(err);
    });
  }

  public selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

  getDateRange() {
    this.openDropdown = !this.openDropdown;
    this.startDate = this.daterange.start._d.getFullYear() + '-' + ('0' + (this.daterange.start._d.getMonth() + 1)).slice(-2) +
      '-' + ('0' + (this.daterange.start._d.getDate() + 1)).slice(-2);
    this.endDate = this.daterange.end._d.getFullYear() + '-' + ('0' + (this.daterange.end._d.getMonth() + 1)).slice(-2) +
      '-' + ('0' + (this.daterange.end._d.getDate() + 1)).slice(-2);
    this.duration = this.startDate.replace(/-/g, '/') + ' - ' + this.endDate.replace(/-/g, '/');
    this.onLoadData(this.startDate, this.endDate);
  }

}
