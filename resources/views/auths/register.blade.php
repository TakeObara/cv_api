@extends('layouts.app')

@section('content')
	<div class="container">
		<div class="col-sm-offset-2 col-sm-8">
			<div class="panel panel-default">
				<div class="panel-heading">
					Register
				</div>

				<div class="panel-body">

					<!-- New Task Form -->
					<form action="/auth/register" method="POST" class="form-horizontal">
						{{ csrf_field() }}

						<!-- Name -->
						<div class="form-group">
							<label for="name" class="col-sm-3 control-label">Name</label>

							<div class="col-sm-6">
								<input type="text" name="name" class="form-control">
							</div>
						</div>

						<!-- E-Mail Address -->
						<div class="form-group">
							<label for="email" class="col-sm-3 control-label">E-Mail</label>

							<div class="col-sm-6">
								<input type="email" name="email" class="form-control">
							</div>
						</div>

						<!-- Password -->
						<div class="form-group">
							<label for="password" class="col-sm-3 control-label">Password</label>

							<div class="col-sm-6">
								<input type="password" name="password" class="form-control">
							</div>
						</div>

						<!-- Register Button -->
						<div class="form-group">
							<div class="col-sm-offset-3 col-sm-6">
								<button type="submit" class="btn btn-default">Register</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<a href="/auth/login" class="btn btn-default">login</a>
		</div>
	</div>
@endsection
