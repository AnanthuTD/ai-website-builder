export const sampleTemplates: Record<string, { html: string; css: string }> = {
	"Health & Fitness": {
		html: `
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <header class="hero">
      <h1>Fit Life</h1>
      <p>Unleash Your Potential</p>
      <button class="cta-btn">Join Now</button>
  </header>
  <section class="programs">
      <h2>Our Programs</h2>
      <div class="program-grid">
          <div class="program-card">
              <img src="https://via.placeholder.com/300x200" alt="Yoga">
              <h3>Yoga Flow</h3>
              <p>Find peace and flexibility</p>
          </div>
          <div class="program-card">
              <img src="https://via.placeholder.com/300x200" alt="Cardio">
              <h3>Cardio Blast</h3>
              <p>Boost your endurance</p>
          </div>
          <div class="program-card">
              <img src="https://via.placeholder.com/300x200" alt="Strength">
              <h3>Strength Training</h3>
              <p>Build muscle and power</p>
          </div>
      </div>
  </section>
  <section class="testimonials">
      <h2>What Our Members Say</h2>
      <div class="testimonial">“Transformed my life!” - Alex</div>
  </section>
  <footer class="footer">
      <h3>Contact Us</h3>
      <form class="contact-form">
          <input type="email" placeholder="Your Email">
          <button type="submit">Send</button>
      </form>
  </footer>
</body>
</html>
      `,
		css: `
body { font-family: 'Poppins', sans-serif; margin: 0; padding: 0; background: #f4f4f4; }
.hero { background: linear-gradient(to right, #28a745, #218838); color: white; text-align: center; padding: 60px 20px; }
.hero h1 { font-size: 3rem; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
.hero p { font-size: 1.5rem; margin: 10px 0; }
.cta-btn { background: #ff6f61; border: none; padding: 12px 24px; color: white; font-size: 1.2rem; cursor: pointer; border-radius: 5px; transition: transform 0.3s ease; }
.cta-btn:hover { transform: scale(1.05); }
.programs { padding: 40px 20px; text-align: center; }
.programs h2 { font-size: 2.5rem; color: #333; margin-bottom: 30px; }
.program-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; }
.program-card { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
.program-card:hover { transform: translateY(-5px); }
.program-card img { width: 100%; height: 200px; object-fit: cover; }
.program-card h3 { font-size: 1.5rem; margin: 10px 0; color: #28a745; }
.program-card p { margin: 0 10px 10px; color: #666; }
.testimonials { background: #e9ecef; padding: 40px 20px; text-align: center; }
.testimonials h2 { font-size: 2rem; color: #333; }
.testimonial { font-style: italic; color: #555; margin-top: 20px; }
.footer { background: #333; color: white; padding: 20px; text-align: center; }
.footer h3 { font-size: 1.5rem; }
.contact-form { display: flex; justify-content: center; gap: 10px; margin-top: 10px; }
.contact-form input { padding: 10px; border: none; border-radius: 5px; }
.contact-form button { padding: 10px 20px; background: #28a745; border: none; color: white; border-radius: 5px; cursor: pointer; }
@media (max-width: 768px) { .hero h1 { font-size: 2rem; } .hero p { font-size: 1rem; } }
      `,
	},
	"Course Selling": {
		html: `
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <header class="hero">
      <h1>Master New Skills</h1>
      <p>Online Courses for Everyone</p>
      <button class="cta-btn">Enroll Now</button>
  </header>
  <section class="curriculum">
      <h2>Course Curriculum</h2>
      <div class="course-list">
          <div class="course-item">Module 1: Introduction</div>
          <div class="course-item">Module 2: Core Concepts</div>
          <div class="course-item">Module 3: Advanced Topics</div>
      </div>
  </section>
  <section class="pricing">
      <h2>Pricing Plans</h2>
      <div class="pricing-grid">
          <div class="plan">Basic - $49</div>
          <div class="plan">Pro - $99</div>
      </div>
  </section>
  <footer class="footer">
      <h3>Stay Updated</h3>
      <form class="newsletter">
          <input type="email" placeholder="Your Email">
          <button type="submit">Subscribe</button>
      </form>
  </footer>
</body>
</html>
      `,
		css: `
body { font-family: 'Poppins', sans-serif; margin: 0; padding: 0; background: #fff; }
.hero { background: linear-gradient(to right, #007bff, #0056b3); color: white; text-align: center; padding: 60px 20px; }
.hero h1 { font-size: 3rem; margin: 0; }
.hero p { font-size: 1.5rem; margin: 10px 0; }
.cta-btn { background: #28a745; border: none; padding: 12px 24px; color: white; font-size: 1.2rem; cursor: pointer; border-radius: 5px; transition: background 0.3s ease; }
.cta-btn:hover { background: #218838; }
.curriculum { padding: 40px 20px; background: #f8f9fa; text-align: center; }
.curriculum h2 { font-size: 2.5rem; color: #333; }
.course-list { max-width: 800px; margin: 20px auto; }
.course-item { background: white; padding: 15px; margin: 10px 0; border-left: 5px solid #007bff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.pricing { padding: 40px 20px; text-align: center; }
.pricing h2 { font-size: 2.5rem; color: #333; }
.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; max-width: 800px; margin: 20px auto; }
.plan { background: #007bff; color: white; padding: 20px; border-radius: 10px; font-size: 1.2rem; }
.footer { background: #333; color: white; padding: 20px; text-align: center; }
.footer h3 { font-size: 1.5rem; }
.newsletter { display: flex; justify-content: center; gap: 10px; margin-top: 10px; }
.newsletter input { padding: 10px; border: none; border-radius: 5px; }
.newsletter button { padding: 10px 20px; background: #007bff; border: none; color: white; border-radius: 5px; cursor: pointer; }
@media (max-width: 768px) { .hero h1 { font-size: 2rem; } }
      `,
	},
	"E-commerce": {
		html: `
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <header class="hero">
      <h1>Trendy Store</h1>
      <p>Shop the Latest Styles</p>
  </header>
  <section class="products">
      <h2>Featured Products</h2>
      <div class="product-grid">
          <div class="product-card">
              <img src="https://via.placeholder.com/300x300" alt="Product 1">
              <h3>Item 1</h3>
              <p>$29.99</p>
              <button class="add-to-cart">Add to Cart</button>
          </div>
          <div class="product-card">
              <img src="https://via.placeholder.com/300x300" alt="Product 2">
              <h3>Item 2</h3>
              <p>$39.99</p>
              <button class="add-to-cart">Add to Cart</button>
          </div>
      </div>
  </section>
  <section class="reviews">
      <h2>Customer Reviews</h2>
      <div class="review">“Great quality!” - Jane</div>
  </section>
  <footer class="footer">
      <p>Free Shipping on Orders Over $50</p>
  </footer>
  <script>
      $(document).ready(function() {
          $('.add-to-cart').click(function() {
              $(this).text('Added!').css('background', '#28a745');
          });
      });
  </script>
</body>
</html>
      `,
		css: `
body { font-family: 'Poppins', sans-serif; margin: 0; padding: 0; background: #f8f9fa; }
.hero { background: linear-gradient(to right, #6c757d, #495057); color: white; text-align: center; padding: 60px 20px; }
.hero h1 { font-size: 3rem; margin: 0; }
.hero p { font-size: 1.5rem; margin: 10px 0; }
.products { padding: 40px 20px; text-align: center; }
.products h2 { font-size: 2.5rem; color: #333; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; }
.product-card { background: white; border-radius: 10px; padding: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.3s ease; }
.product-card:hover { transform: scale(1.03); }
.product-card img { width: 100%; height: 300px; object-fit: cover; border-radius: 5px; }
.product-card h3 { font-size: 1.5rem; margin: 10px 0; color: #495057; }
.product-card p { font-size: 1.2rem; color: #666; }
.add-to-cart { background: #6c757d; border: none; padding: 10px; color: white; width: 100%; border-radius: 5px; cursor: pointer; transition: background 0.3s ease; }
.add-to-cart:hover { background: #5a6268; }
.reviews { background: #e9ecef; padding: 40px 20px; text-align: center; }
.reviews h2 { font-size: 2rem; color: #333; }
.review { font-style: italic; color: #555; margin-top: 20px; }
.footer { background: #333; color: white; padding: 20px; text-align: center; }
@media (max-width: 768px) { .hero h1 { font-size: 2rem; } }
      `,
	},
	Portfolio: {
		html: `
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <header class="hero">
      <h1>John Doe</h1>
      <p>Creative Designer</p>
  </header>
  <section class="works">
      <h2>My Works</h2>
      <div class="work-grid">
          <div class="work-item">
              <img src="https://via.placeholder.com/400x300" alt="Project 1">
              <h3>Project 1</h3>
          </div>
          <div class="work-item">
              <img src="https://via.placeholder.com/400x300" alt="Project 2">
              <h3>Project 2</h3>
          </div>
      </div>
  </section>
  <section class="about">
      <h2>About Me</h2>
      <p>Passionate about design and innovation.</p>
  </section>
  <footer class="footer">
      <p>Contact: john@example.com</p>
  </footer>
</body>
</html>
      `,
		css: `
body { font-family: 'Poppins', sans-serif; margin: 0; padding: 0; background: #fff; }
.hero { background: linear-gradient(to right, #343a40, #212529); color: white; text-align: center; padding: 60px 20px; }
.hero h1 { font-size: 3rem; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
.hero p { font-size: 1.5rem; margin: 10px 0; }
.works { padding: 40px 20px; text-align: center; }
.works h2 { font-size: 2.5rem; color: #333; }
.work-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; }
.work-item { background: #f8f9fa; border-radius: 10px; overflow: hidden; transition: transform 0.3s ease; }
.work-item:hover { transform: scale(1.05); }
.work-item img { width: 100%; height: 300px; object-fit: cover; }
.work-item h3 { font-size: 1.5rem; margin: 10px 0; color: #343a40; }
.about { background: #e9ecef; padding: 40px 20px; text-align: center; }
.about h2 { font-size: 2rem; color: #333; }
.about p { font-size: 1.2rem; color: #666; max-width: 800px; margin: 20px auto; }
.footer { background: #333; color: white; padding: 20px; text-align: center; }
@media (max-width: 768px) { .hero h1 { font-size: 2rem; } }
      `,
	},
	Blog: {
		html: `
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <header class="hero">
      <h1>My Blog</h1>
      <p>Thoughts & Stories</p>
  </header>
  <section class="posts">
      <h2>Latest Posts</h2>
      <div class="post-list">
          <div class="post">
              <h3>Post Title 1</h3>
              <p>Lorem ipsum dolor sit amet...</p>
          </div>
          <div class="post">
              <h3>Post Title 2</h3>
              <p>Consectetur adipiscing elit...</p>
          </div>
      </div>
  </section>
  <section class="sidebar">
      <h2>About</h2>
      <p>Hi, I'm a writer sharing my journey.</p>
  </section>
  <footer class="footer">
      <form class="subscribe">
          <input type="email" placeholder="Subscribe">
          <button type="submit">Join</button>
      </form>
  </footer>
</body>
</html>
      `,
		css: `
body { font-family: 'Poppins', sans-serif; margin: 0; padding: 0; background: #f4f4f4; }
.hero { background: linear-gradient(to right, #ff6b6b, #ee5253); color: white; text-align: center; padding: 60px 20px; }
.hero h1 { font-size: 3rem; margin: 0; }
.hero p { font-size: 1.5rem; margin: 10px 0; }
.posts { padding: 40px 20px; max-width: 800px; margin: 0 auto; }
.posts h2 { font-size: 2.5rem; color: #333; text-align: center; }
.post-list { margin-top: 20px; }
.post { background: white; padding: 20px; margin-bottom: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.post h3 { font-size: 1.8rem; margin: 0 0 10px; color: #ff6b6b; }
.post p { color: #666; }
.sidebar { background: #e9ecef; padding: 20px; text-align: center; }
.sidebar h2 { font-size: 2rem; color: #333; }
.sidebar p { color: #666; }
.footer { background: #333; color: white; padding: 20px; text-align: center; }
.subscribe { display: flex; justify-content: center; gap: 10px; }
.subscribe input { padding: 10px; border: none; border-radius: 5px; }
.subscribe button { padding: 10px 20px; background: #ff6b6b; border: none; color: white; border-radius: 5px; cursor: pointer; transition: background 0.3s ease; }
.subscribe button:hover { background: #ee5253; }
@media (max-width: 768px) { .hero h1 { font-size: 2rem; } }
      `,
	},
};
