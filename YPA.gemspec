# frozen_string_literal: true

Gem::Specification.new do |spec|
    spec.name          = "YPA"
    spec.version       = "2.1.0"
    spec.authors       = ["Jackson Meade"]
    spec.email         = ["jacksonmeade@outlook.com"]
  
    spec.summary       = "This is the layout for the new YPA Website. It will run in the background and present the content as those who maintain the site in the future only have to change the README.md content"
  
    spec.license       = "MIT"
  
    spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }
  
    spec.add_runtime_dependency "jekyll", "~> 4.2.2"
  
    spec.add_development_dependency "bundler", "~> 2.3.17"
    spec.add_development_dependency "rake", "~> 13.0.6"
  end