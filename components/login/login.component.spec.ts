import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const routerStub = () => ({ navigate: array => ({}) });
    const matSnackBarStub = () => ({ open: (string, string1, object) => ({}) });
    const authenticationServiceStub = () => ({
      login: (username, password) => ({ subscribe: f => f({}) }),
      isLogged: {}
    });
    const translateServiceStub = () => ({
      setDefaultLang: string => ({}),
      use: string => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: Router, useFactory: routerStub },
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: TranslateService, useFactory: translateServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`currentLocale has default value`, () => {
    expect(component.currentLocale).toEqual(`en`);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.ngOnInit();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });

  describe('doLogin', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const matSnackBarStub: MatSnackBar = fixture.debugElement.injector.get(
        MatSnackBar
      );
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(matSnackBarStub, 'open').and.callThrough();
      spyOn(authenticationServiceStub, 'login').and.callThrough();
      component.doLogin();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(matSnackBarStub.open).toHaveBeenCalled();
      expect(authenticationServiceStub.login).toHaveBeenCalled();
    });
  });
});
