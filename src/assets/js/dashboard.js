





const ctx = document.getElementById('performanceChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Orders',
        data: [30, 50, 70, 60, 55, 65, 45, 40, 80, 60, 58, 63],
        backgroundColor: '#ff3d3d',
        borderRadius: 4,
      },
      {
        label: 'Revenue',
        data: [20, 15, 25, 30, 40, 35, 20, 18, 45, 40, 42, 38],
        type: 'line',
        borderColor: '#00b300',
        tension: 0.3,
        fill: false,
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Highlight clicked submenu item
document.querySelectorAll('#sidebar ul ul a').forEach(link => {
  link.addEventListener('click', function () {
    // Remove existing active
    document.querySelectorAll('#sidebar ul ul a').forEach(el => el.classList.remove('active'));
    // Add active to clicked one
    this.classList.add('active');
  });
});




